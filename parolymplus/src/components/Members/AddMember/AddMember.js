import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap"

const AddMember = (props) => {

    const [open, setOpen] = useState(false);

    const closeHandler = () => setOpen(false);
    const openHandler = () => setOpen(true);

    return (
        <React.Fragment>
        <Button variant="primary" onClick={openHandler}>
            Add Member
        </Button> 

        <Modal 
            show={open} 
            onHide={closeHandler}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeHandler}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
};

export default AddMember;