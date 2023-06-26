<template>
  <div class="contact-board">
    <TopBar />
    <div class="content-test">
      <div class="operation-bar">
        <h3>Sqlite 测试</h3>

        <div class="add">
          <span>增: </span>
          <button @click="insertOneData">增加一行数据</button>
          <input style="width: 40px" min="1" type="number" v-model.trim="multiNumber" />
          <button @click="insertMultiData">{{ `增加${multiNumber}行数据` }}</button>
        </div>

        <div class="del">
          <span>删: </span>
          <input type="text" v-model.trim="curDelId" />
          <button @click="deleteData">{{ curDelId ? `删除id为${curDelId}的数据` : '请输入id后操作' }}</button>
        </div>

        <div class="change">
          <span>改: </span>
          <input type="text" v-model.trim="curChangeId" />
          <button @click="updateData">{{ curChangeId ? `修改id为${curChangeId}的数据` : '请输入id后操作' }}</button>
        </div>

        <div class="query">
          <span>查: </span>
          <button @click="changePage('first')">第一页</button>
          <button @click="changePage('pre')">&lt;</button>
          <button @click="changePage('next')">&gt;</button>
          <button @click="changePage('last')">最后一页</button>

          <input
            type="number"
            style="width: 40px"
            min="1"
            max="99"
            placeholder="分页大小"
            v-model.trim="pageParams.pageSize"
          />

          <button @click="getAllDbData">获取全部数据</button>

          <input type="text" v-model.trim="curQueryId" clear />
          <button @click="queryOneById">
            {{ curQueryId ? `查询id为${curQueryId.substr(0, 6)}的数据` : '请输入id后操作' }}
          </button>
        </div>

        <div class="transaction">
          <span>事务: </span>
          <button @click="transaction">使用事务插入一条message</button>
          <button @click="queryTest">关联数据查询</button>
        </div>
      </div>
      <TransitionGroup name="list" tag="table" border v-if="allData?.length">
        <tr key="th">
          <th v-for="key in Object.keys(allData[0])">{{ key }}</th>
        </tr>
        <tr v-for="item in allData" :key="item.id">
          <td v-for="key in Object.keys(item)">{{ item[key as keyof ModelChat] }}</td>
        </tr>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import db from '../../../common/db'
import { ModelChat } from '../../../model/ModelChat'
import { ModelMessage } from '../../../model/ModelMessage'
import TopBar from '../../components/TopBar.vue'

const allData = ref<ModelChat[]>()
/** 插入几行数据 */
const multiNumber = ref(2)
/** 当前要删除的id */
const curDelId = ref()
/** 当前要修改的id */
const curChangeId = ref()
/** 当前要查询的id */
const curQueryId = ref()

/** 分页参数 */
const pageParams = ref({
  pageSize: 3,
  curPage: 1,
  totalCount: 0,
  maxPage: 0,
})

onMounted(async () => {
  await queryData()
})

/** 增加一条数据 */
const insertOneData = async () => {
  const model = new ModelChat()
  model.fromName = '聊天对象'
  model.sendTime = Date.now()
  model.lastMsg = '这是此会话的最后一条消息'
  model.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`
  await db('Chat').insert(model)
  await getAllDbData()
}

/** 增加多条数据 */
const insertMultiData = async () => {
  const result = []
  for (let i = 0; i < multiNumber.value; i++) {
    const model = new ModelChat()
    model.fromName = '聊天对象' + i
    model.sendTime = Date.now() + i
    model.lastMsg = '这是此会话的最后一条消息' + i
    model.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`
    result.push(model)
  }

  const randomNumber = Math.floor(Math.random() * multiNumber.value)
  result[randomNumber].isSelected = true
  await db('Chat').insert(result)
  await getAllDbData()
}

/** 删除指定id */
const deleteData = async () => {
  if (!curDelId.value) {
    return
  }

  const res = await db('Chat').where({ id: curDelId.value }).delete()

  if (!res) {
    alert('id 错误!')
  }
  curDelId.value = ''

  await getAllDbData()
}

/** 修改指定id数据 */
const updateData = async () => {
  const res = await db('Chat')
    .update({ fromName: '改改改改', lastMsg: '改改改改改改改改改改改改改改改改,改改改改改改改改改改改改改改改改' })
    .where({ id: curChangeId.value })

  if (!res) {
    alert('id 错误!')
  }
  curChangeId.value = ''

  await getAllDbData()
}

/** 查询列表参数修改 */
const changePage = async (type: 'pre' | 'next' | 'first' | 'last' = 'next') => {
  switch (type) {
    case 'pre':
      pageParams.value.curPage = pageParams.value.curPage - 1 || 1
      break
    case 'next':
      pageParams.value.curPage = pageParams.value.curPage + 1
      break
    case 'first':
      pageParams.value.curPage = 1
      break
    case 'last':
      pageParams.value.curPage = pageParams.value.maxPage!
      break
  }
  await queryData()
}

/** 根据分页参数查询 */
const queryData = async () => {
  const data = await db('Chat')
    .orderBy('sendTime', 'desc')
    .offset((pageParams.value.curPage - 1) * pageParams.value.pageSize)
    .limit(pageParams.value.pageSize)

  const res = await db('Chat').count('id as count').first()
  const totalCount = res?.count as number

  pageParams.value.totalCount = totalCount
  pageParams.value.maxPage = Math.ceil(totalCount / pageParams.value.pageSize)

  allData.value = data
}

/** 获取全部数据 */
const getAllDbData = async () => {
  pageParams.value.curPage = 1
  pageParams.value.pageSize = pageParams.value.totalCount
  await queryData()
}

/** 根据id查询一条数据 */
const queryOneById = async () => {
  if (!curQueryId.value) {
    return
  }
  const data = await db('Chat').where({ id: curQueryId.value })

  allData.value = data
}

/** 事务处理 */
const transaction = async () => {
  try {
    await db.transaction(async (trx) => {
      const chat = new ModelChat()
      chat.fromName = '事务插入'
      chat.sendTime = Date.now()
      chat.lastMsg = '这是此事务插入'
      chat.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`
      await trx('Chat').insert(chat)

      const message = new ModelMessage()
      message.fromName = '聊天对象'
      message.chatId = chat.id
      message.createTime = Date.now()
      message.isInMsg = true
      message.messageContent = '这是我发给你的消息'
      message.receiveTime = Date.now()
      message.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`
      await trx('Message').insert(message)
    })
  } catch (error) {
    console.error(error)
  }
  await queryData()
}

const queryTest = async () => {
  /**
   * leftJoin保证左边(Message)即使没有匹配到关联行也会返回
   * 如果是一对多的关系则会返回多条关联数据
   */
  const res = await db('Message').leftJoin('Chat', 'Message.chatId', 'Chat.id').select('*')
  console.log(res)
}
</script>

<style scoped lang="scss">
table {
  font-size: 12px;
  overflow: hidden;
  user-select: text;
}
.contact-board {
  flex: 1;
}
.content-test {
  box-sizing: border-box;
  padding: 0 18px;
  background: #fff;
  overflow: scroll;
  max-height: calc(100% - var(--top-bar-height));
}

.operation-bar {
  position: sticky;
  top: 0;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
