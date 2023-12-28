import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Form} from 'react-bootstrap';
// import HtmlHead from 'components/html-head/HtmlHead';
// import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

const baseUrl = 'http://127.0.0.1:8000/midi';

const Upload = () => {

    // const [formSubmitted, setFormSubmitted] = useState(false);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();

    const saveValues = (payload) => {
      console.log(payload,"payload")
      const formData = new FormData();
      formData.append('input', payload.input);
      formData.append('output', payload.output);

      axios
      .post(
        `${baseUrl}/fetch/`,formData,
        {
          // headers: {
          //   Authorization: `Token ${token}`,
          //   Accept: 'application/json',
          //   'Content-Type': 'application/json',
          // },
        }
      )
      .then((resp) => {
        console.log(resp,"response");
      });
    }

    useEffect(() => {
    }, []);

    // const formik = useFormik({
    //     initialValues: {
    //       input: null,
    //       output: null,
    //     },
    //     validate: (values) => {
    //       const errors = {};
    
    //       if (formSubmitted) {
    //         if (!values.input) {
    //           errors.file1 = 'Input is required';
    //         }
    
    //         if (!values.output) {
    //           errors.shortTitle = 'Output is required';
    //         }
    //       }
    
    //       return errors;
    //     },
    //     onSubmit: (values, { resetForm }) => {
    //       console.log(values,"values");
    //       saveValues(values);
    //       // Reset form fields after successful submission
    //       resetForm({
    //         values: {
    //             input: null,
    //             output: null,
    //         },
    //       });
    //     },
    //   });
    
      const handleSaveClick = () => {
        console.log("clicked");
        saveValues({input:input,output:output});
        // setFormSubmitted(true);
        // formik.validateForm().then((errors) => {
        //   if (Object.keys(errors).length === 0) {
        //     console.log("formik");
        //     // saveValues();
        //     formik.handleSubmit();
        //   }
        // });
      };

    return(
        <div>
            <Form 
            // onSubmit={formik.handleSubmit}
            >
            <Row>
                <Col md={6}>
                  <Form.Group controlId="input">
                    <Form.Control
                      type="file"
                      name="input"
                      // value={input}
                      onChange={(event)=> setInput(event.target.files[0])}
                      // onChange={(event) => formik.setFieldValue('output', event.target.files[0])}
                      // value={formik.values.input}
                      accept=".png, .gif, .jpg, .jpeg .mp3"
                      // onBlur={formik.handleBlur}
                      // isInvalid={formik.touched.input && !!formik.errors.input}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="output">
                    <Form.Control
                      type="file"
                      name="output"
                      // value={output}
                      onChange={(event)=> setOutput(event.target.files[0])}
                      // onChange={(event) => formik.setFieldValue('output', event.target.files[0])}
                      accept=".png, .gif, .jpg, .jpeg .mp3"
                      // onBlur={formik.handleBlur}
                      // isInvalid={formik.touched.output && !!formik.errors.output}
                    />
                  </Form.Group>
                </Col>
              </Row>
            <br />
            <br />
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Button type="button" 
                onClick={handleSaveClick}
                >
                  Save
                </Button>
            </div>
            </Form>
        </div>
    );
}

export default Upload;