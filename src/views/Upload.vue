<template>
  <div class="centered">
    <v-container>
      <v-card class="mx-auto" max-width="500" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Upload file</v-list-item-title>
            <v-select v-model="endpoint" dense outlined label="Endpoint" :items="endpoints"/>
            <v-checkbox label="NSFW" v-model="nsfw" @change="update" style="margin-left: 10px;"/>
            <file-pond
              name="upload"
              ref="pond"
              label-idle="Drop files here..."
              v-bind:allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, image/gif"
              data-max-file-size="30MB"
              v-bind:server="server"
              v-on:initfile="handleFilePondInitFile"
            />
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import { api } from '@/api.js'
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata"

const FilePond = vueFilePond(
  FilePondPluginFileMetadata,
)

export default {
  data () {
    return {
      endpoints: [],
      endpoint: "waifu",
      nsfw: false,
      server: {
        process: {
          url: `${process.env.VUE_APP_API}upload`,
          method: 'POST',
          withCredentials: true,
        },
      },
    }
  },
  mounted: function () {
    this.update()
  },
  methods: {
    update: function () {
      api.getEndpoints((res, err) => {
        this.endpoints = (this.nsfw ? res.nsfw : res.sfw)
        this.endpoint = this.endpoints[0]
      })
    },
    handleFilePondInitFile(item) {
      item.setMetadata("type", this.endpoint)
      item.setMetadata("nsfw", this.nsfw)
    },
  },
  components: {
    FilePond,
  },
}
</script>

<style lang="scss" scoped>
.centered {
  max-width: 500px;
  max-height: 500px;
  text-align: center;
}
.v-select {
  margin-top: 20px;
}
</style>

<style lang="scss">
.filepond--root {
  margin-top: -15px;
  max-height: 500px;
  max-width: 500px;
}
.filepond--drop-label {
  color: #eee;
}
.filepond--label-action {
  text-decoration-color: #aaa;
}
.filepond--panel-root {
  background-color: #1e1e1e;
}
.filepond--item-panel {
  background-color: #3b3b3b;
}
</style>
