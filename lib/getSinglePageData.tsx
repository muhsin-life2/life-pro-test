export default async function getSessionData(params) {

    const res = await fetch(`https://prodapp.lifepharmacy.com/api/cms/page/${params}`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}