<template>
  <v-layout justify-center :class="$style.layout">
    <v-flex :class="$style.container">
      <h2 :class="$style.title">詳細画面</h2>
      <p>タイトル：{{ article.title }}</p>
      <h2>本文</h2>
      <p>{{ article.content }}</p>
      <p>投稿者：{{ article.user.name }}</p>
      <div v-if="isMyArticle">
        <v-btn
          elevation="4"
          ripple
          depressed
          class="white--text font-weight-bold"
          :class="[$style.button, $style.register]"
          color="cyan"
          :to="`/articles/${id}/edit`"
          nuxt
          >編集</v-btn
        >
        <v-btn
          color="red"
          elevation="4"
          ripple
          depressed
          :loading="loading"
          class="white--text font-weight-bold"
          :class="[$style.button, $style.register]"
          @click="submit"
          >削除</v-btn
        >
      </div>

      <h2 :class="$style.title">コメント</h2>
      <v-form ref="titleForm" @submit.prevent>
        <v-text-field
          v-model="content"
          type="text"
          name="content"
          label="コメント"
          data-vv-name="content"
          solo
          required
          outlined
          color="#212121"
        />
      </v-form>
      <v-btn
        color="green"
        elevation="4"
        align="center"
        justify="right"
        ripple
        depressed
        :loading="loading"
        class="white--text font-weight-bold"
        :class="[$style.button, $style.register]"
        @click="commented"
        >送信</v-btn
      >
      <h4 :class="$style.title">コメント一覧</h4>
      <ul
        v-for="(comment_user, index) in article.comment_user"
        :key="`first-${index}`"
      >
        <li>
          コメント内容：{{ comment_user.content }} コメント者：{{
            comment_user.user
          }}
        </li>
      </ul>
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
export default class ArticleDetailPage extends Vue {
  title = ''
  content = ''
  loading = false
  async submit(): Promise<void> {
    this.loading = true
    const id = this.$route.params.id
    await this.$store
      .dispatch('article/deleteArticle', id)
      .then(() => {
        this.$router.push('/')
      })
      .finally(() => {
        this.loading = false
      })
  }

  async commented(): Promise<void> {
    this.loading = true
    const params = {
      content: this.content,
      id: this.$route.params.id,
    }
    await this.$store
      .dispatch('comment/commentNew', params)
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

  get commentUser() {
    return this.article.comment_user
  }

  get isMyArticle() {
    return this.article.is_my_article
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
  .button {
    margin-bottom: 14px;
  }
}
</style>
