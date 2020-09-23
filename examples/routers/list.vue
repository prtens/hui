<template>
  <div>
    <strong>Default Size:</strong>
    <br><br>
    <h-list
      border
      :split="false"
    >
      <template slot="header">
        Header1111111
      </template>
      <h-list-item>111111111</h-list-item>
      <h-list-item>22222222</h-list-item>
      <h-list-item>333333333</h-list-item>
      <template slot="footer">
        Footer1111111
      </template>
    </h-list>
    <br>
    <strong>Small Size:</strong>
    <br><br>
    <h-list
      header="Header"
      footer="Footer"
      border
      size="small"
    >
      <h-list-item>111111111</h-list-item>
      <h-list-item>22222222</h-list-item>
      <h-list-item>333333333</h-list-item>
    </h-list>
    <br>
    <strong>Large Size:</strong>
    <br><br>
    <h-list
      header="Header"
      footer="Footer"
      border
      size="large"
    >
      <h-list-item>111111111</h-list-item>
      <h-list-item>22222222</h-list-item>
      <h-list-item>333333333</h-list-item>
    </h-list>
    <br>
    <strong>带有图标、标题、描述的基础列表。</strong>
    <br><br>
    <h-list>
      <h-list-item>
        <h-list-item-meta
          avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          title="This is title"
          description="This is description, this is description."
        />
      </h-list-item>
      <h-list-item>
        <h-list-item-meta
          avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          title="This is title"
          description="This is description, this is description."
        />
      </h-list-item>
      <h-list-item>
        <h-list-item-meta
          avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          title="This is title"
          description="This is description, this is description."
        />
        <template slot="action">
          <li>
            <a href="">Edit</a>
          </li>
          <li>
            <a href="">More</a>
          </li>
        </template>
      </h-list-item>
      <h-list-item>
        <h-list-item-meta
          avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          title="This is title"
          description="This is description, this is description."
        />
        <template slot="action">
          <li>
            <a href="">Edit</a>
          </li>
          <li>
            <a href="">More</a>
          </li>
        </template>
      </h-list-item>
    </h-list>
    <br>
    <strong>竖排列表样式。设置属性 itemLayout 为 vertical 可实现竖排列表样式。</strong>
    <br><br>
    <h-list itemLayout="vertical">
      <h-list-item
        v-for="item in data"
        :key="item.title"
      >
        <h-list-item-meta
          :avatar="item.avatar"
          :title="item.title"
          :description="item.description"
        />
        {{ item.content }}
        <template slot="action">
          <li>
            <i class="el-icon-edit"></i> 123
          </li>
          <li>
            <i class="el-icon-edit"></i> 123
          </li>
          <li>
            <i class="el-icon-edit"></i> 123
          </li>
        </template>
        <template slot="extra">
          <el-image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600245345654&di=6ebe170e5c4d9423f2cd559b6e53fde7&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg"
            fit="contain"
            style="width: 280px;"
          ></el-image>
        </template>
      </h-list-item>
    </h-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: '这是标题 1',
          description: '这是一段很长的描述信息，这是一段很长的描述信息，这是一段很长的描述信息。',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          content: '这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容。'
        },
        {
          title: '这是标题 2',
          description: '这是一段很长的描述信息，这是一段很长的描述信息，这是一段很长的描述信息。',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          content: '这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容。'
        },
        {
          title: '这是标题 3',
          description: '这是一段很长的描述信息，这是一段很长的描述信息，这是一段很长的描述信息。',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          content: '这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容。'
        }
      ]
    };
  }
};
</script>
