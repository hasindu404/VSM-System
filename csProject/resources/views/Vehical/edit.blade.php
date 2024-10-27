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
    <form method="post" action="{{route('vehical.update',['vehical'=> $vehical])}}">
        @csrf
        @method('put')
        <div>
            <label>Vehical Id: </label>
            <input type="text" name="vehicalid" placeholder="vehical_id" value="{{$vehical->vehicalid}}">
        </div>
        <div>
            <label>Brand: </label>
            <input type="text" name="brand" placeholder="brand" value="{{$vehical->brand}}">
        </div>
        <div>
            <label>Year: </label>
            <input type="text" name="year" placeholder="year" value="{{$vehical->year}}">
        </div>
        <div>
            <label>Catagory: </label>
            <input type="text" name="catagory" placeholder="catagory" value="{{$vehical->catagory}}">
        </div>
        <div>
            <label>Last Service Date: </label>
            <input type="date" name="last_service_date" placeholder="date" value="{{$vehical->last_service_date}}">
        </div>
        <div>
            <label>Colour: </label>
            <input type="text" name="colour" placeholder="colour" value="{{$vehical->colour}}">
        </div>
        <div>
            <input type="submit" method="post">
        </div>
    </form>
</body>
</html>
