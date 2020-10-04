<template>
  <v-layout justify-center :class="$style.layout">
    <v-flex :class="$style.container">
      <h2 :class="$style.title">記事投稿</h2>
      <v-form ref="titleForm" @submit.prevent>
        <v-text-field
          v-model="title"
          type="title"
          name="title"
          label="タイトル"
          data-vv-name="title"
          solo
          required
          outlined
          color="#212121"
        />
      </v-form>
      <v-form ref="contentForm" @submit.prevent>
        <v-textarea
          v-model="content"
          class="textarea"
          value="value"
          type="content"
          rows="5"
          name="content"
          label="本文"
          hint=""
          filled
          counter
          outlined
          color="#212121"
          placeholder="本文を入力してください"
        />
      </v-form>
      <v-btn
        color="cyan"
        elevation="4"
        type="submit"
        ripple
        block
        depressed
        :loading="loading"
        class="white--text font-weight-bold"
        :class="[$style.button, $style.register]"
        @click="submit"
        >投稿する</v-btn
      >
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class articleNewPage extends Vue {
  title = ''
  content = ''
  loading = false
  async submit(): Promise<void> {
    const params = {
      title: this.title,
      content: this.content,
    }
    await this.$store.dispatch('article/articleNew', params).then(() => {
      this.$router.push('/')
    })
  }
}
</script>

<style lang="scss" module>
.layout {
  background: #f7f9f9;

  .container {
    height: 100%;
    max-width: 360px;
    padding: 20px 20px 60px;
    background: white;
  }

  .title {
    text-align: center;
    margin-bottom: 20px;
  }

  .sign_in_link {
    display: flex;
    justify-content: center;
    text-decoration: none;
  }

  .terms {
    margin-right: 6px;
  }

  .register {
    margin-top: 20px;
  }

  .divider {
    margin: 20px 0;
  }

  .social_title {
    margin-bottom: 20px;
  }

  .button {
    margin-bottom: 14px;
  }

  .sns_text {
    color: #ffffff;
    margin-left: 8px;
  }
}
</style>
