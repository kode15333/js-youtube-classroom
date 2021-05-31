
export const ModalTemplate = {
    video({title, videoId, channelTitle, publishTime}) {
        return `
              <article class="clip">
                <div class="preview-container">
                  <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                  <h3>${title}</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      ${channelTitle}
                    </a>
                    <div class="meta">
                      <p>${publishTime}</p>
                    </div>
                    <div class="d-flex justify-end">
                      <button class="btn">⬇️ 저장</button>
                    </div>
                  </div>
                </div>
              </article>
        `
    }
}
