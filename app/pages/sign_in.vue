<template>
  <v-layout justify-center :class="$style.layout">
    <v-flex :class="$style.container">
      <h2 :class="$style.title">ログインする</h2>
      <v-form ref="emailForm" @submit.prevent>
        <v-text-field
          v-model="email"
          type="email"
          name="email"
          label="メールアドレス"
          data-vv-name="email"
          required
          outlined
          color="#212121"
          placeholder="例: mail@example.com"
          @keypress.enter="submit"
        />
      </v-form>
      <v-form ref="passwordForm" @submit.prevent>
        <v-text-field
          v-model="password"
          type="password"
          name="password"
          label="パスワード(半角英数字)"
          hint="6文字以上の半角英数字を入力してください"
          counter
          outlined
          color="#212121"
          placeholder="例: 6文字以上の半角英数字"
          @keypress.enter="submit"
        />
      </v-form>
      <v-btn
        color="#f96204"
        type="submit"
        block
        depressed
        :loading="loading"
        class="white--text font-weight-bold"
        :class="[$style.button, $style.register]"
        @click="submit"
        >ログインする</v-btn
      >
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class SignInPage extends Vue {
  // name = ''
  email = ''
  password = ''
  loading = false
  async submit(): Promise<void> {
    const params = {
      email: this.email,
      password: this.password,
    }
    await this.$store.dispatch('user/signIn', params).then(() => {
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
