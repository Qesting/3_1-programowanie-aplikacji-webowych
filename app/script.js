import { key as apiKey, endpoint as apiEndpoint } from './api.js'

const table = document.getElementById('ex1-tbody')

document.getElementById('ex1-form')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.target
    const data = new FormData(form)
    const capitalToSearch = data.get('capital')?.toString()?.replaceAll(/\b\p{Lower}/vg, match => match.toLocaleUpperCase())

    if (!capitalToSearch) return

    const url = new URL(apiEndpoint + 'capitals/' + encodeURIComponent(capitalToSearch))

    console.log(capitalToSearch, url)

    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Headers': '*,Authorization',
            'Authorization': 'Bearer ' + apiKey,
        }
    })

    const json = await response.json()

    if (response.errors) {
        console.error(response)
        return
    }

    const country = json.data.objects[0]

    const tr = document.createElement('tr')
    tr.innerHTML = `
        <td>${country.flag.emoji}${country.names.common}</td>
        <td>${country.capitals[0].name}</td>
        <td>${country.population}</td>
        <td>${country.region}</td>
        <td>${country.subregion}</td>
    `

    table.appendChild(tr)
})