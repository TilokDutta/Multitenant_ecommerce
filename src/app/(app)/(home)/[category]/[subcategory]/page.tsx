import React from 'react'

interface  Props{
    params:Promise<{
        category:string;
        subcategory:string;
    }>
}

const Category_Page = async ({ params } : Props) => {
    const { category , subcategory} = await params;
  return (
    <div>
        Category : { category }<br/>
        Subcategory : {subcategory}
    </div>
  )
}

export default Category_Page