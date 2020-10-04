import { Selector, ClientFunction, Role } from 'testcafe'

// 名前入力フォーム
const inputName = Selector('input[type="name"]')
// Email入力フォーム
const inputEmail = Selector('input[type="email"]')
// パスワード入力フォーム
const inputPassword = Selector('input[type="password"]')
// ボタン
const btnSubmit = Selector('button[type="submit"]')
// タイトル入力フォーム
const inputTitle = Selector('input[type="title"]')
// 本文入力フォーム
const inputContent = Selector('textarea[name="content"]')

const topPage = 'http://localhost:8080/'

// 先にログインしておく処理
const user = Role('localhost:8080/sign_in', async (t: TestController) => {
  await t
    .typeText(inputEmail, 'koniii@hogee.com')
    .typeText(inputPassword, 'aaaaaa')
    .click(btnSubmit.withText('ログインする'))
})

// fixture('新規登録').page('localhost:8080/sign_up')

// test('新規登録テスト', async (t: TestController) => {
//   await t
//     .typeText(inputName, 'koni')
//     .typeText(inputEmail, 'koniii@hogeeee.com')
//     .typeText(inputPassword, 'aaaaaa')
//     .click(btnSubmit.withText('登録する（無料）'))

//   const getLocation = ClientFunction(() => document.location.href)
//   await t.expect(getLocation()).eql(topPage)
// })

fixture('ログイン').page('localhost:8080/sign_in')

test('ログインテスト', async (t: TestController) => {
  await t
    .typeText(inputEmail, 'koniii@hogee.com')
    .typeText(inputPassword, 'aaaaaa')
    .click(btnSubmit.withText('ログインする'))

  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).eql(topPage)
})

fixture('新規投稿').page('localhost:8080/articles/new')

test('ログインしているユーザーが記事投稿できるテスト', async (t: TestController) => {
  await t
    .useRole(user)
    .typeText(inputTitle, 'テスト')
    .typeText(inputContent, 'テストだよ')
    .click(btnSubmit.withText('投稿する'))

  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).eql(topPage)
  // .click(Selector('a').withText('テスト'))
  // await t.expect(Selector('li').nth(-1)).textContent('テスト')
})
