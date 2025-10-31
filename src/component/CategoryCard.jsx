export default function CategoryCard({category}){
    return (
        <div className="text-center">
            <img src={`https://down-vn.img.susercontent.com/file/${category.imageUrl}`} className="" style={{height:'80px'}}></img>
            <p>{category.name}</p>
        </div>
    )
}