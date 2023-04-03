
import SingleProductsContent from "../../components/single-product-page";
import SinglePageContent from "../../home/[slug]/page";
import getProductsData from "../../lib/getProductsData";

export default async function productPage({ params }) {
    const pro_data_res = await getProductsData()
    const pro_data = await pro_data_res

    const filt_proData = pro_data.data.products.filter(pro_data => (
        pro_data.slug === params.slug
    ))

    
    return (
        <SingleProductsContent pro_data={filt_proData} />
    )

}