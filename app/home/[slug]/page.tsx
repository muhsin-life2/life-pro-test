// "use client"; // this is a client component

import { FC, Suspense } from "react";
import PageStructure from "../../components/page-structure";
import getHomePageData from "../../lib/getHomePageData";
import getProductsData from "../../lib/getProductsData";
export const dynamic = 'force-static'

// async function getStaticParams(slug) {

//     const res = await fetch(`https://prodapp.lifepharmacy.com/api/cms/page/${slug}`);
//     if (!res.ok) {
//         throw new Error("Unable to fetch Page Data")
//     }
//     return res.json();

// }


// export default SinglePageContent;


async function getSinglePageData(params) {

    const res = await fetch(`https://prodapp.lifepharmacy.com/api/cms/page/${params}`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}

const SinglePageContent = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    const data_res = await getSinglePageData(slug)
    const data = await data_res

    const pro_data_res = await getProductsData()
    const pro_data = await pro_data_res


    return (
        <>
            <PageStructure data={data.data.content} pro_data={pro_data.data.products} />
        </>
    )
}

export async function generateStaticParams() {

    const res = await getHomePageData();
    const home_page_data = await res.data.content
    const allPaths = home_page_data.filter(contObj => (contObj.section_type === "dynamic_grid" || "dynamic_slider_grid") && contObj.section_data_array && contObj.section_data_array.length != 0
    ).filter(contObj => contObj.section_data_array.some(secDataArray => secDataArray.slug != null))
    var slugsData: string[] = []
    allPaths.map(secData =>
        secData.section_data_array.map(secDataArray => (
            secDataArray.slug != null &&
            slugsData.push(secDataArray.slug)
        ))
    )
    var filt_paths = [...new Set(slugsData)]

    return filt_paths.map((slug) => ({

        slug,

    }));
}

export default SinglePageContent;
