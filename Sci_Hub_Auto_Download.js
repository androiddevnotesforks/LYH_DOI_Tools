

async function main()
{
    let settings_storage = get_storage('settings')
    let hide_sci_hub = get_dict_value(settings_storage, "hide_scihub_or_libgen", true)

    // let current_url = window.location.href
    // let regex = RegExp(/(?:sci-hub\.\w\w\/)(\S+)/)
    // let current_doi = current_url.match(regex)[1]
    // regex = new RegExp(/[<>:"\/\\|?*%]/,'g')
    // let download_filename = current_doi.replace(regex, '_') + '.pdf'

    if (document.getElementById('pdf'))
    {
        if ('src' in document.getElementById('pdf'))
        {
            let pdf_link = document.getElementById('pdf')['src']
            // console.log("Download link:", pdf_link)
            let link_filename = pdf_link.split('/')
            link_filename = link_filename[link_filename.length - 1].split('#')[0]

            let link = document.createElement('a');
            link.href = pdf_link;
            link.click();

            let text = "<b>PDF download auto-started by LYH DOI Tools... </b></br></br>"
            text += 'PDF file found: <b>[ ' + link_filename + ' ]</b><br><br>'
            text += 'This page will (probably) self-destruct in 10 seconds...<br><br>'
            text += 'Cancel this by unchecking the "Auto hide Sci-Hub or Lib-Gen page" option in the popup page<br><br>'
            document.getElementById('article').innerHTML = '<center><br><br><br><br><br><br><br>' + text + '</center>'

            if (hide_sci_hub)
            {
                chrome.runtime.sendMessage({switch_to_previous_tab: window.location.href});
                setTimeout(function ()
                           {
                               chrome.runtime.sendMessage({closeThis: true});
                           },
                           10000);
            }

        }
        else
        {
            console.log("PDF file not found.")
        }
    }
    else
    {
        console.log("PDF file not found.")
    }

}

main()