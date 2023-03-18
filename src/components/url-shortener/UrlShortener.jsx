import { ErrorMessage, Field, Form, Formik } from "formik"
import isUrl from "is-url"
import { useState } from "react"
import { getOriginalUrlApi, shortenUrlApi } from "../api/UrlShortenerApi"
export default function UrlShortener(){

    //const [urlDetails, setUrlDetails] = useState(null)
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [isshortUrlAvailable, setShortUrlAvailable] = useState(false)
    const [longUrl, setLongUrl] = useState('')
    const [isLongUrlAvailable, setLongUrlAvailable] = useState(false)

    function errorResponse(error){
        console.log(error)
    }

    function onSubmit(values){
        setLongUrlAvailable(false)
        setShortUrlAvailable(false)
        console.log(values)
        const urlDetails={
                        url:values.url
                    }
        console.log(urlDetails)

        shortenUrlApi(urlDetails)
            .then(response =>{
                console.log("logging response")
               console.log(response)
               setShortUrl(response.data)
               setShortUrlAvailable(true)
            })
            .catch((error) => errorResponse(error))
       
    }

    function getShortUrlPath(shortUrl){
            const shortUrlArray = shortUrl.split("/")
            console.log("logging array")
            console.log(shortUrlArray[1])
            return shortUrlArray[1]
    }

    function getOriginalUrl(shortUrl){
        console.log(shortUrl)

            getOriginalUrlApi(getShortUrlPath(shortUrl))
            .then(response =>{
                console.log("logging response")
               console.log(response)
               setLongUrl(response.data)
               setLongUrlAvailable(true)
            })
            .catch((error) => errorResponse(error))
    }

    function validate(values){
        let errors = {
            // url: 'Enter a valid URL',
            // targetDate: 'Enter a valid targetDate'
        }
        if(values.url == null || !isUrl(values.url))
        {
            errors.url='Not a valid URL. Please enter a correct URL'
        }
        console.log(values)
        return errors
    }

    return(
        <div className="UrlShortener">
            <div className="container">
            <h1>URL Shortener</h1>
            <div>
                <Formik initialValues={{url}} 
                enableReinitialize={true}
                onSubmit={onSubmit}  
                validate={validate}             
                validateOnChange={false}
                validateOnBlur={false}>
                {
                    (props) => (
                        <Form className="form-group">
                            <ErrorMessage name="url" component="div" className="alert alert-warning"/>
                            <fieldset>
                                <label>Input URL</label>
                                <Field type="text" className="form-control" name="url"/>
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type="submit">Shorten Url</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>  
            <div>
                    {isshortUrlAvailable && <h2>Shortened URL</h2>}
                    {isshortUrlAvailable && <h3>{shortUrl}</h3> }

                  <div>
                   {isshortUrlAvailable && <p>Note - To get Original Url back, paste the short URL in the address bar or click on the button below</p>}
                   </div>

                   {isshortUrlAvailable && <button className="btn btn-success m-5" onClick={() =>getOriginalUrl(shortUrl)}>Get Original Url</button>}

                     {isLongUrlAvailable && <h2>Original URL</h2>}
                     {isLongUrlAvailable && <h3>{longUrl}</h3> }
            </div>          
            </div>
        </div>
    )

}