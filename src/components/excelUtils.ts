/**
 * 数组转成对象
 * @param headerConfig
 */
export function array2obj(headerConfig:Array<{code:string,name:string}>,curryHeader:Array<string | null>,curryData:Array<Array<string | null>>){
    const newHeader = getCode(headerConfig,curryHeader);
    const result =  curryData.map(
        (item)=>{
            return item.reduce((pre:Record<string, string | null>,cur,currentIndex)=>{
                pre[newHeader[currentIndex].code] = cur ;
                return pre
            },{})
        }
    )

    return result;
};

export function getCode(headerConfig:Array<{code:string,name:string}>,curryHeader:Array<string | null>){
    return curryHeader.map(
        (item)=>{
            const target = headerConfig.findIndex(
                (curry)=>{
                    return curry.name === item
                }
            )
            return {name:item,code:headerConfig[target]?.code || ""}
        }
    )
}
