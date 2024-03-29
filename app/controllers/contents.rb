Doublejump::App.controllers :contents do

  post :add_code, :map => "/content/code/add" do

    content_type :json
    create_content(params, CodeContent, :code_content)

  end

  post :add_markdown, :map => "/content/markdown/add" do

    content_type :json
    create_content(params, MarkdownContent, :markdown_content)

  end

  post :add_hideable, :map => "/content/hideable/add" do

    content_type :json
    create_content(params, HideableContent, :hideable_content)

  end

  post :add_math, :map => "/content/math/add" do

    content_type :json
    create_content(params, MathContent, :math_content)

  end

  post :add_definition, :map => "/content/definition/add" do

    content_type :json
    create_content(params, DefinitionContent, :definition_content)

  end

  post :add_two_cols, :map => "/content/two_cols/add" do

    content_type :json
    create_content(params, TwoColsContent, :two_cols_content)

  end


end

def create_content(params, model_class, array_key)

    puts params.inspect

    # Catch empty id errors
    if params[array_key].has_key?("id") && params[array_key][:id].empty?
        params[array_key].delete("id")
    end

    if params[array_key].has_key?("id")
        content = model_class.find(params[array_key][:id])
        content.update_attributes(params[array_key])
    else
        content = model_class.create(params[array_key])
    end

    if content.valid?
        content.save
        return {success: true, id: content.id.to_s}.to_json
    end

    {success: false}.to_json
  end
