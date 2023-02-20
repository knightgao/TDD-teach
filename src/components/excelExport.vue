<script setup lang="ts">
import Excel from 'Exceljs';
import { computed, ref } from "vue";
import { array2obj } from "./excelUtils";


export interface Props {
  headerConfig: Array<{ name: string, code: string }>
}

const props = withDefaults(defineProps<Props>(), {
  headerConfig: () => [{
    name: "蟹卡卡号",
    code: "cardCode"
  }, {
    name: "蟹卡卡密",
    code: "cardPwd"
  }, {
    name: "套餐详情",
    code: "cardDetail"
  }, {
    name: "总价值",
    code: "allCost"
  }
  ]
})


// 去除模版说明后的tab
const sheets = ref<Excel.Worksheet[]>([])


// 取第一项的tab
const curryTab = computed(() => {
  return sheets.value[0] || []
})

const curryHeader = computed(() => {
  return sheets.value?.[0]?.getRow(1)?.values || []
})

const curryData = computed(() => {
  // eachRow(callback: (row: Row, rowNumber: number) => void): void;
  const result: any[] = []
  sheets.value?.[0]?.eachRow((row: Excel.Row, rowNumber: number) => {
    if (rowNumber !== 1) {
      result.push(row.values)
    }
  })
  return result || []
})


/**
 * 读取excel
 */
const pickerOpts = {
  multiple: false
};
const handleGetFile = async () => {
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  // 获取文件内容
  const fileData = await fileHandle.getFile();
  const buffer = await readFile(fileData);
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(buffer);
  sheets.value = filterName(workbook.worksheets);
}

function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      if (fr.result instanceof ArrayBuffer) {
        resolve(fr.result)
      } else {
        reject();
      }
    }
    fr.onerror = reject
    fr.readAsArrayBuffer(file)
  })
}


/**
 * 筛选tab
 * @param Worksheets
 */
function filterName(Worksheets: Excel.Worksheet[]): Excel.Worksheet[] {
  return Worksheets.filter(
    (worksheet) => {
      if (["模版"].includes(worksheet.name)) {
        return false
      }
      return true
    }
  )
}


/**
 * 处理转换
 */
const handleShowTable = () => {
  const all = array2obj(props.headerConfig, curryHeader.value, curryData.value)
}


</script>

<template>
  <div class="excelExport">

    <button type="button" @click="handleGetFile">选择文件</button>

    <button type="button" @click="handleShowTable">展示</button>

    curryHeader:{{ curryHeader }}

    curryData:{{ curryData }}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
