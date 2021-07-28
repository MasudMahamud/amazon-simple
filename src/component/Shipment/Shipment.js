import React from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { useContext } from 'react';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

    }


    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your name" />
            {errors.name && <span className="error" >name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your email" />
            {errors.email && <span className="error" >email is required</span>}

            <input defaultValue={loggedInUser.Division} {...register("Division", { required: true })} placeholder="Division" />
            {errors.division && <span className="error" >Division is required</span>}

            <input defaultValue={loggedInUser.Division} {...register("State", { required: true })} placeholder="State" />
            {errors.state && <span className="error" >State is required</span>}

            <input defaultValue={loggedInUser.zipcode} {...register("zipcode", { required: true })} placeholder="zipcode" />
            {errors.zipcode && <span className="error" >zipcode is required</span>}


            <input type="submit" />
        </form>
    );

};

export default Shipment;