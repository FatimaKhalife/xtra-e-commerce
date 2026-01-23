export const success=(res,data ={} , message="")=>
    res.json({ success: true, message, data });

export const fail = (res,message,status=400)=>
    res.satuts(status).json({success:false,message});