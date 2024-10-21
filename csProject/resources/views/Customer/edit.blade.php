<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Customer Management</h1>
    <form method="post" action="{{route('customer.update',['customer'=> $customer])}}">
        @csrf
        @method('put')
        <div>
            <label>First Name: </label>
            <input type="text" name="fname" placeholder="First Name" value="{{$customer->fname}}">
        </div>
        <div>
            <label>Last Name: </label>
            <input type="text" name="lname" placeholder="Last Name" value="{{$customer->lname}}">
        </div>
        <div>
            <label>Address: </label>
            <input type="text" name="address" placeholder="Address" value="{{$customer->address}}">
        </div>
        <div>
            <label>Contact No: </label>
            <input type="numbers" name="contact" placeholder="Contact No" value="{{$customer->contact}}">
        </div>
        <div>
            <label>E mail: </label>
            <input type="text" name="email" placeholder="E-Mail" value="{{$customer->email}}">
        </div>
        <div>
            <label>Vehicle ID: </label>
            <input type="text" name="vehicleid" placeholder="Vehicle id" value="{{$customer->vehicleid}}">
        </div>
        <div>
            <input type="submit" method="post">
        </div>
    </form>
</body>
</html>
