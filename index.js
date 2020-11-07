var links = [
    {
        'name': 'Cloudflare',
        'url': 'https://www.cloudflare.com'
    }, {
        'name': 'WizardingWorld',
        'url': 'https://www.wizardingworld.com/'
    }, {
        'name': 'JavaScript',
        'url': 'https://www.javascript.com/'
    }
]

let linkedIn = {
    'logo': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    'url': 'https://www.linkedin.com/in/pauraviwagh/'
}
let github = {
    'logo': '​<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    'url': 'https://github.com/PauraviW'
}
let facebook = {
    'logo': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" style="null" class="icon icons8-Facebook-Filled" >    <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"></path></svg>',
    'url': 'https://www.facebook.com/pauraviw'
}
let socialMediaLinks = [linkedIn, github, facebook]

class LinkHandler {
    constructor(links) {
        this.links = links
    }

    async element(element) {
        for (let i = 0; i < this.links.length; i++) {

            let linkDetails = '<a href=\'' + this.links[i]['url'] + '\'>' + this.links[i]['name'] + '</a>\n'
            element.append(linkDetails, {html: true})
        }
    }
}

class ProfileHandler {
    async element(element) {
        element.removeAttribute('style')

    }
}

class AvatarHandler {
    async element(element) {
        element.setAttribute('src', 'https://i.ibb.co/dt4wcqh/Dp1.jpg')

    }
}

class NameHandler {
    async element(element) {
        element.setInnerContent('Pauravi Wagh')
    }
}

class TitleHandler {
    async element(element) {
        element.setInnerContent('Pauravi Wagh')
    }
}

class BodyHandler {
    async element(element) {
        element.setAttribute('class', 'bg-red-500')
    }
}

class SocialMediaHandler {
    constructor(socialMediaLinks) {
        this.socialMediaLinks = socialMediaLinks
    }


    async element(element) {
        element.removeAttribute('style')
        for (let i = 0; i < this.socialMediaLinks.length; i++) {
            let socialMediaLink = this.socialMediaLinks[i]
            let link_tag = '<a href=\'' + socialMediaLink['url'] + '\'>' + socialMediaLink['logo'] + '</a>\n'
            element.append(link_tag, {html: true})
        }
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request), links)
})

/**
* Respond to the request
* @param {Request} request
*/
async function handleRequest(request) {
    const url = new URL(request.url);
    let element = url.pathname.split("/").filter(n => n);
    if (element[0] === 'links') {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json;charset=UTF-8')
        return new Response(JSON.stringify(links, null, 2), {headers: headers})
    } else if (element[0] === undefined) {
      
        const headers = {
            headers: {
                "content-type": "text/html;charset=UTF-8"
            }
        }
        let response = await fetch('https://static-links-page.signalnerve.workers.dev')
        let HTMLrewriter = new HTMLRewriter().on('div#links', new LinkHandler(links)).on('div#profile', new ProfileHandler()).on('img#avatar', new AvatarHandler()).on('h1#name', new NameHandler()).on('div#social', new SocialMediaHandler(socialMediaLinks)).on('title', new TitleHandler()).on('body', new BodyHandler())
        return HTMLrewriter.transform(response)
    } else {
        return new Response("404 - Page Not Found", {status: "404"});
    }
 
}
