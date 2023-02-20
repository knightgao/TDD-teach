import { describe,expect, it } from 'vitest'
import {array2obj, getCode} from "./excelUtils"

describe("excelExport",()=>{

    it('excel', () => {
        expect(true).toBe(true)
    })

    it("array2obj",()=>{
        const headerConfig = [{
            name:"蟹卡卡号",
            code:"cardCode"
        },{
            name:"蟹卡卡密",
            code:"cardPwd"
        },{
            name:"套餐详情",
            code:"cardDetail"
        },{
            name:"总价值",
            code:"allCost"
        }
        ];

        const curryHeader = [ null, "蟹卡卡号", "蟹卡卡密", "套餐详情", "总价值" ];
        const curryData = [ [ null, "hwz00123", "hwz12345", "蟹卡套餐详情", "600.00" ] ];
        const map = getCode(headerConfig,curryHeader)
        console.log(map)



        const data = array2obj(headerConfig,curryHeader,curryData);
        console.log(data)
    })

})
