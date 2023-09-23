<?php if(!defined('IN_GS')){ die('you cannot load this page directly.'); }
$innov_settings = Innovation_Settings();
include('header.inc.php'); 
?>
	<div class="container-fluid">
		<!-- page content -->
<div class="row">
<div class="col-12 col-md-12 p-3 p-md-5">
<nav class="breadcrumb justify-content-center bg-white">
  <ol class="breadcrumb bg-dark text-light">
			 <li class="breadcrumb-item">
				<a href="<?php get_site_url(); ?>">Home</a> </li>
				<li class="breadcrumb-item">
				<?php Innovation_Parent_Link(get_parent(FALSE)); ?> <b><?php get_page_clean_title(); ?></b>
				</li> 
				<li class="breadcrumb-item"><a href="<?php get_site_url(); ?>" id="logo" ><?php get_site_name(); ?></a></li>
			</ol></nav>
				<h1 class="text-center"><strong><a href="<?php get_page_url(); ?>"><?php get_page_title(); ?></a></strong></h1>
				<p class="text-center">Published on <time datetime="<?php get_page_date('Y-m-d'); ?>" pubdate><?php get_page_date('F jS, Y'); ?></time></p>
				<?php get_page_content(); ?>
			</div>
</div></div>
<?php include('footer.inc.php'); ?>
<script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>
<script src='https://mesinkasir.github.io/larapos/pos/gallerya.js'></script>
