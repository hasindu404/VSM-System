<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Vehical_id Management</h1>
    <form method="post" action="{{route('vehical.store')}}">
        @csrf
        @method('post')
        <div>
            <label>Vehical Id: </label>
            <input type="text" name="vehicalid" placeholder="vehical_id">
        </div>
        <div>
            <label>Brand: </label>
            <input type="text" name="brand" placeholder="brand">
        </div>
        <div>
            <label>Year: </label>
            <input type="text" name="year" placeholder="year">
        </div>
        <div>
            <label>Catagory: </label>
            <input type="text" name="catagory" placeholder="catagory">
        </div>
        <div>
            <label>Last Service Date: </label>
            <input type="date" name="last_service_date" placeholder="date">
        </div>
        <div>
            <label>Colour: </label>
            <input type="text" name="colour" placeholder="colour">
        </div>
        <div>
            <input type="submit" method="post">
        </div>
    </form>
    <div>
        <table border="1">
            <tr>
                <th>Vehical Id</th>
                <th>Brand</th>
                <th>Year</th>
                <th>Catagory</th>
                <th>Last Service Date</th>
                <th>Colour</th>
                <th>Created_at</th>
                <th>Updated_at</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            @foreach ($vehicals as $vehical)
                <tr>
                    <td>{{$vehical->vehicalid}}</td>
                    <td>{{$vehical->brand}}</td>
                    <td>{{$vehical->year}}</td>
                    <td>{{$vehical->catagory}}</td>
                    <td>{{$vehical->last_service_date}}</td>
                    <td>{{$vehical->colour}}</td>
                    <td>{{$vehical->created_at}}</td>
                    <td>{{$vehical->updated_at}}</td>
                    <td>
                        <a href="{{route('vehical.edit',['vehical'=>$vehical])}}">Edit</a>
                    </td>
                    <td>
                        <form method="POST" action="{{route('vehical.delete',['vehical'=>$vehical])}}">
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
