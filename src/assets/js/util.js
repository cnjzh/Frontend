const convertISOStringToDateTime=(isoString)=>
{
    return isoString.slice(0,10)+" "+isoString.slice(11,19);
}
export const converTimestampToISOString=(timestamp)=>
{
    const date= new Date(timestamp);
    const hour=date.getHours().toString().padStart(2,"0");
    const originISOString=date.toISOString();
    const isoString=`${originISOString.slice(0,10)}T${hour}${originISOString.slice(13)}`;
    return isoString;
}

export  const gethistory=()=> 
{
    const history=localStorage.getItem("issue-history");
    if(history)
    {
        return [...new Set(JSON.parse(history))];
    }
    return [];

}
export const setHistory=(issueId)=>
{
    const history=gethistory();
    if(history.length===0){
        localStorage.setItem("issue-history",JSON.stringify([issueId]));
        return ;
    }
    history.push(issueId);
    localStorage.setItem("issue-history",JSON.stringify(history));
}
export const processIssueObj=(issueObj)=>
{
    const resArr=[];
    const keyMap={
        id:"工单号",
        poster:"提交人",
        createDate:"提交时间",
        description:"工单描述",
        state:"状态",
        fixedDate:"完成时间",
        staffId:"负责人ID"

    }
    const stateMap={
        wait:"等待处理",
        fixing:"处理中",
        compelete:"已完成",
    }
    Object.entries(issueObj).forEach(([key,value])=>
    {
        if(key==="image")
        {return;}
        if(key==="state")
        {value=stateMap[value];}
        if(key==="createDate"||key==="fixedDate")
        {value=value?convertISOStringToDateTime(value):"无";}
        value=value?value:"无";
        resArr.push(`${keyMap[key]}:${value}`);
    });
    return resArr;
}