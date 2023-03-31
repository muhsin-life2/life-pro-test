// "use client"; // this is a client component

import PageStructure from "../../../components/page-structure";
import getHomePageData from "../../../lib/getHomePageData";
import getProductsData from "../../../lib/getProductsData";


// async function getStaticParams(slug) {

//     const res = await fetch(`https://prodapp.lifepharmacy.com/api/cms/page/${slug}`);
//     if (!res.ok) {
//         throw new Error("Unable to fetch Page Data")
//     }
//     return res.json();

// }


// export default SinglePageContent;

export async function generateStaticParams() {
    // const res = await fetch("https://prodapp.lifepharmacy.com/api/cms/page/home")
    // const data = await res.json();
    // const home_page_data = data.data.content;
    // // var allPaths = null
    // const allPaths = home_page_data.filter(contObj => (contObj.section_type === "dynamic_grid" || "dynamic_slider_grid") && contObj.section_data_array && contObj.section_data_array.length != 0
    // ).filter(contObj => contObj.section_data_array.some(secDataArray => secDataArray.slug != null))
    // var slugs = []
    // allPaths.map(secData =>
    //     secData.section_data_array.map(secDataArray => (
    //         secDataArray.slug != null &&
    //         slugs.push(secDataArray.slug)
    //     ))
    // )
    // var filt_paths = [...new Set(slugs)]

    // console.log(home_page_data);


    return []




}

async function getSinglePageData(params) {
    // console.log(params);

    const res = await fetch(`https://prodapp.lifepharmacy.com/api/cms/page/${params}`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}

export default async function SinglePageContent({ params }) {

    const data_res = await getSinglePageData(params.slug)
    const data = await data_res

    const pro_data_res = await getProductsData()
    const pro_data = await pro_data_res


    return (
        <>
            <PageStructure data={data.data.content} pro_data={pro_data.data.products} />
        </>
    )
}