const dummy = (blogs) => {
  return blogs = 1

}


const totalLikes = (listWithOneBlog) => {
  if (listWithOneBlog.length===1) {

    return listWithOneBlog[0].likes


  }
}

const emptyList = (emptyBlogs) => {

  if (emptyBlogs.length=== 0) {

    return 0
  }
}

const biggerList = (bigList) => {

  if (bigList.length > 1) {

    let totalbLikes = bigList.reduce((accum,item) => accum + item.likes, 0)

    return totalbLikes
  }
}




module.exports = {
  dummy,
  totalLikes,
  emptyList,
  biggerList
}