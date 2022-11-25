
class ApiFeatures {
    constructor(query, queryStr) { this.query = query; this.queryStr = queryStr; }



    search() {

        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                },
            } :
            {}

        this.query = this.query.find({...keyword})

        return this;
    }
    filter(){
  
        var a={...this.queryStr};
        const toRemove=["page","limit","keyword"];

        toRemove.forEach(e=>delete a[e])

        a=JSON.stringify(a);
        a = a.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
         this.query=this.query.find(JSON.parse(a));
        
        return this;

    }
    pagination(maxElement){
        const a=(this.queryStr.page-1)*maxElement;
        this.query = this.query.limit(maxElement).skip(a);
        return this;
    }
}
 

module.exports = ApiFeatures;