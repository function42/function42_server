<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;


class APIController extends Controller
{
		/**
		* Get a article
		*
		* @return \Illuminate\Http\Response
		*/
    public function get_article($id)
    {
        $article = Article::find($id);
        if ($article and $article->is_public) {
            return response() -> json([
                'status' => 0,
                'title' => $article->title,
                'content' => $article->content
            ]);       	
        } else {
            return response() -> json([
                'status' => 31,
                'description' => '未找到'
            ]);
        }
    }
}
