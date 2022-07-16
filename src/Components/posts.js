import React from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import * as Yup from "yup";
const Posts = () => {
    const formik = useFormik({
        initialValues: {
          title: "",
          body: "",
          userId: ""
        },
        onSubmit: (values) => {
            const card={id:Math.floor(Math.random()*10) ,title:values.title,body:values.body,userId:values.userId}
            const router=axios.create({baseURL:'https://api.tawwr.com'})
            router.post('/posts',card)
            console.log(values)
        },
        validationSchema: Yup.object({
          title: Yup.string().required("Title is required").min(10,"limit small").max(40, "limit passed"),
          body: Yup.string().required("your message is required").min(10, "limit small"),
          userId: Yup.string().required("User ID is required").min(1, "limit small").max(1, "limit passed")

        }),
      });
  return (
    <section  className='create-post'>
        <form>
            <input type="text" value={formik.values.title} onChange={formik.handleChange}  onBlur={formik.handleBlur}
            name="title"  placeholder='Title'/>
            <p>{(formik.errors.title && formik.touched.title) ? formik.errors.title : ""}</p>
            <input type="text" value={formik.values.body} onChange={formik.handleChange} onBlur={formik.handleBlur}
            name="body" placeholder='Body' />
            <p>{(formik.errors.body && formik.touched.body) ? formik.errors.body : ""}</p>
            <input type="number" value={formik.values.userId} onChange={formik.handleChange} onBlur={formik.handleBlur}
            name="userId" placeholder='UserID' />
            <p>{(formik.errors.userId && formik.touched.userId) ? formik.errors.userId : ""}</p>
            <button  onClick={formik.handleSubmit} className='btn'>Post</button>
        </form>
    </section>
    
  )
}
export default Posts