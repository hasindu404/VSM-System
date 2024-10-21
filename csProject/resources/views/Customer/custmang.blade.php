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
    <form method="post" action="{{route('customer.store')}}">
        @csrf
        @method('post')
        <div>
            <label>First Name: </label>
            <input type="text" name="fname" placeholder="First Name">
        </div>
        <div>
            <label>Last Name: </label>
            <input type="text" name="lname" placeholder="Last Name">
        </div>
        <div>
            <label>Address: </label>
            <input type="text" name="address" placeholder="Address">
        </div>
        <div>
            <label>Contact No: </label>
            <input type="numbers" name="contact" placeholder="Contact No">
        </div>
        <div>
            <label>E mail: </label>
            <input type="text" name="email" placeholder="E-Mail">
        </div>
        <div>
            <label>Vehicle ID: </label>
            <input type="text" name="vehicleid" placeholder="Vehicle id">
        </div>
        <div>
            <input type="submit" method="post">
        </div>
    </form>
    <div>
        <table border="1">
            <tr>
                <th>Customer_id</th>
                <th>First_Name</th>
                <th>Last_name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>E-mail</th>
                <th>Vehical_id</th>
                <th>Created_at</th>
                <th>Updated_at</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            @foreach ($customers as $customer)
                <tr>
                    <td>{{$customer->id}}</td>
                    <td>{{$customer->fname}}</td>
                    <td>{{$customer->lname}}</td>
                    <td>{{$customer->address}}</td>
                    <td>{{$customer->contact}}</td>
                    <td>{{$customer->email}}</td>
                    <td>{{$customer->vehicleid}}</td>
                    <td>{{$customer->created_at}}</td>
                    <td>{{$customer->updated_at}}</td>
                    <td>
                        <a href="{{route('customer.edit',['customer'=>$customer])}}">Edit</a>
                    </td>
                    <td>
                        <form method="POST" action="{{route('customer.delete',['customer'=>$customer])}}">
                            @csrf
                            @method('delete')
                            <input type="submit" value="Delete">
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
    </div>
</body>
</html>
