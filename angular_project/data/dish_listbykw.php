
 <?php
 //根据菜品名称/原料查询
    header('Content-Type: application/json');
    @$kw = $_REQUEST['kw'];
    if (!isset($kw)){
       echo '[]';
        return;
    }
    $conn = mysqli_connect('127.0.0.1','root','','kaifanla','3306');
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT did,name,price,material,img_sm FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'";
    $result = mysqli_query($conn,$sql);
    $output=[];
    while(($row=mysqli_fetch_assoc($result))!==NULL){
        $output[]=$row;
    }
    $jsonString=json_encode($output);
    echo $jsonString;
 ?>