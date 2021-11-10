<template>
  <div>
    <v-alert
      v-if="isIncomplete"
      color="red"
      elevation="6"
      type="error"
      style="z-index: 1000"
      >Some informations are missing</v-alert
    >
    <v-row justify="center" width="75%" class="mt-12">
      <v-dialog v-model="showDialog" persistent max-width="700px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
            @click="toggleDialog(true)"
          >
            Add fruit
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Fruit details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Name *"
                    v-model="item.name"
                    :disabled="readOnly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Price *"
                    prefix="$"
                    v-model="item.price"
                    :disabled="readOnly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Taste *"
                    required
                    v-model="item.taste"
                    :disabled="readOnly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="URL Image *"
                    required
                    v-model="item.image"
                    :disabled="readOnly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"> </v-col>
                <v-col cols="12">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Description *"
                    v-model="item.description"
                    :disabled="readOnly"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <p>Color *</p>
                  <v-color-picker
                    justify="center"
                    dot-size="36"
                    swatches-max-height="250"
                    v-model="item.color"
                    :disabled="readOnly"
                  ></v-color-picker>
                </v-col>
                <v-col cols="12" sm="6">
                  <p>Expires *</p>
                  <v-date-picker
                    v-model="item.expires"
                    :disabled="readOnly"
                  ></v-date-picker>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions class="pb-6">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="toggleDialog(false)">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="createItem()">
              {{ readOnly ? "OK" : "Save" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Fruit } from "@/pages/fruits/fruit.type";

export default {
  props: {
    readOnly: Boolean,
    selectedItem: Object,
    requiredFields: Object,
  },
  data: (): any => ({
    item: {},
    isIncomplete: false,
  }),
  computed: {
    showDialog(): boolean {
      return this.$store.state.showDialog;
    },
  },
  watch: {
    selectedItem: function (selectedItem: Fruit): void {
      this.item =
        Object.keys(selectedItem).length > 0
          ? {
              ...selectedItem,
              color: { hex: selectedItem.color },
              expires: new Date(selectedItem.expires)
                .toISOString()
                .split("T")[0],
            }
          : {};
    },
  },
  methods: {
    createItem(): void {
      if (!this.readOnly) {
        if (!this.isDataComplete(this.item)) {
          this.isIncomplete = true;
          return;
        }
        this.isIncomplete = false;
        this.$emit("createItem", this.item);
      }
      this.$store.dispatch("toggleDialog", false);
    },
    toggleDialog(value: boolean): void {
      this.$store.dispatch("toggleDialog", value);
      this.$emit("toggleReadOnly", false, {});
    },
    isDataComplete(data: Record<string, string>): boolean {
      return Object.keys(this.requiredFields).every((key: string) => data[key]);
    },
  },
};
</script>
