<template>
  <v-layout justify-center :class="$style.layout">
    <v-flex :class="$style.container">
      <h2 :class="$style.title">記事編集</h2>
      <v-form ref="titleForm" @submit.prevent>
        <v-text-field
          v-model="title"
          type="text"
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
          type="text"
          rows="5"
          name="content"
          label="本文"
          hint=""
          filled
          counter
          outlined
          color="#212121"
        />
      </v-form>
      <v-btn
        color="cyan"
        elevation="4"
        ripple
        block
        depressed
        :loading="loading"
        class="white--text font-weight-bold"
        :class="[$style.button, $style.register]"
        @click="submit"
        >更新する</v-btn
      >
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

@Component({
  async fetch(context: Context) {
    const { store, error, route } = context
    const id = route.params.id
    try {
      await store.dispatch('article/fetchArticle', id)
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.data.message,
      })
    }
  },
})
export default class ArticleEditPage extends Vue {
  title = this.article.title
  content = this.article.content
  loading = false
  async submit(): Promise<void> {
    this.loading = true
    const params = {
      title: this.title,
      content: this.content,
      id: this.$route.params.id,
    }
    await this.$store
      .dispatch('article/updateArticle', params)
      .then(() => {
        this.$router.push(`/articles/${this.$route.params.id}`)
      })
      .finally(() => {
        this.loading = false
      })
  }

  get article() {
    return this.$store.getters['article/article']
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
