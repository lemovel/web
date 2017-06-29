
 <?php
 //根据编号列出某移到菜的详情
    header('Content-Type: application/json');
    @$did= $_REQUEST['did'];
    if (!isset($did)){
       echo '[]';
        return;
    }
    $conn = mysqli_connect('127.0.0.1','root','','kaifanla','3306');
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT did,name,price,material,img_lg FROM kf_dish WHERE did=$did";
    $result = mysqli_query($conn,$sql);
   $row=mysqli_fetch_assoc($result);
    $jsonString=json_encode($row);
    echo $jsonString;
 ?>