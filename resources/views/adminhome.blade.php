<!DOCTYPE html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>FUNCTION42 后台</title>
</head>
<body>
    <p>Hello</p>
    <div id="example"></div>
    <div id="root"></div>
</body>
<script src="{{ asset('js/app.js') }}"></script>
</html>