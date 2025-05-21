import React from 'react'

interface  Props{
    params:Promise<{
        category:string;
    }>
}

const Category_Page = async ({ params } : Props) => {
    const { category } = await params;
  return (
    <div>
        Category : { category }
    </div>
  )
}

export default Category_Page