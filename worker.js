addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let mirror_domain = "emuparadise.ga" // Change this to the domain you are using for your mirror.
  let request_url = request.url.replace(mirror_domain,"emuparadise.me")
  try {
    let gid = parseInt(request_url.split("/")[5].split("-")[0])
    if (!isNaN(gid)) {
      const response = await fetch(request_url)
      let text = await response.text()
      text = text.replace("emuparadise.me",mirror_domain).replace('<h3>This game is unavailable <span style="font-size:10px;">(<a target="_blank" style="text-decoration:none;color:orange;" href="/emuparadise-changing.php">?</a>)</span></h3>','<h3><a href="/roms/get-download.php?gid=' + gid + '">Download</a></h3>')
      return new Response(text,{status:response.status,statusText:response.statusText,headers:response.headers})
    }
  } catch(e) {}
  try {
    let gid = parseInt(request_url.split("/")[4].split("get-download.php?gid=")[1].split("&")[0])
    if (!isNaN(gid)) {
      let new_headers = new Headers()
      new_headers.set('Referer','emuparadise.me')
      request_url = request_url.replace('/emuparadise.me','/www.emuparadise.me').replace('http:','https:')
      const response2 = await fetch(request_url + '&test=true',{headers:new_headers,redirect:"manual"})
      if (response2.status == 301){
        return Response.redirect(response2.headers.get('Location'),301)
        //
        // This here was an attempt to proxy the download itself as well through Cloudflare. Unfortunately, I was unsuccussful.
        //
        // const resp = await fetch(response2.headers.get('Location'))
        // let moresplit = response2.headers.get('Location').split('/')
        // let name = moresplit[moresplit.length - 1]
        // let newh = new Headers(resp.headers)
        // newh.set('Content-Disposition','attachment; filename="'+name+'"')
        // return new Response(await resp.body,{headers:newh})
      }
    }
  } catch (e) {console.log(e)}
  const response = await fetch(request_url)
  let text = await response.text()
  text = text.replace("emuparadise.me",mirror_domain)
  return new Response(text,{status:response.status,statusText:response.statusText,headers:response.headers})
}
