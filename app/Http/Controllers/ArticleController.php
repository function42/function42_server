<?php

namespace App\Http\Controllers;

use App\Article;
// use Auth;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     *
     * @return \Illuminate\Http\Response
     */
    public function articles_list()
    {
        $articles = Article::all();
        return $articles;
    }

    /**
     * Get a article
     *
     * @return \Illuminate\Http\Response
     */
    public function get_article(Request $request)
    {
        // $id = $request->id;
        // $article = Article::where('id', $id);
        // return response() -> json([
        //     'status' => 0,
        //     'article' => $article
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save_article(Request $request)
    {
        $article = new Article;
        // $user_id = Auth::User()->id;
        $article->is_public = $request->is_public;
        $article->title = $request->title;
        $article->content = $request->content;
        $article->user_id = $request->user()->id;
        $article->save();
        return response() -> json([
            'status' => 0,
            'tmp' => $article
        ]);
    }

    /**
     * Change article's public attribute.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function change_public(Request $request)
    {
        $id = $request->id;
        $article = Article::find($id);
        if ($article->is_public) {
            $article->is_public = 0;
        } else {
            $article->is_public = 1;
        }
        $article->save();
        // return $article;
        return response() -> json([
            'status' => 0,
            'description' => '文章公开属性修改成功'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * delete a article.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function delete_article($id)
    {
        $article = Article::find($id);
        $article->delete();
        return response() -> json([
            'status' => 0,
            'description' => '文章删除成功'
        ]);
    }
}
