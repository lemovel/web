
 <?php
 //根据电话列出某所下的所有订单
    header('Content-Type: application/json');
    @$phone= $_REQUEST['phone'];
    if (!isset($phone)){
       echo '[]';
        return;
    }
    $conn = mysqli_connect('127.0.0.1','root','','kaifanla','3306');
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
   $sql = "SELECT oid,user_name,order_time,img_sm FROM kf_order,kf_dish  WHERE phone='$phone' AND kf_dish.did=kf_order.did ";
    $result = mysqli_query($conn,$sql);
    $output= [];
    while (( $row=mysqli_fetch_assoc($result))!==NULL)
    {
        $output []= $row;
    }
    $jsonString=json_encode($output);
    echo $jsonString;
 ?>