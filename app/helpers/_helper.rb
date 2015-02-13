# Helper methods defined here can be accessed in any controller or view in the application

Doublejump::App.helpers do

  def errors_for (object, field)
    if object && object.errors
        return object.errors.messages[field]
    else
        return {}
    end
  end

  def local_or_live(local_option, live_option)

    ret = case Padrino.env
      when :development then local_option
      when :production  then live_option
      when :test        then local_option
    end

    ret

  end

  def is_ajax?
    request.xhr?
  end

  def include_phaser()
    javascript_include_tag( local_or_live('/local_required/phaser.min.js', '//cdnjs.cloudflare.com/ajax/libs/phaser/2.0.6/phaser.min.js') )
  end

  def stripe_publishable_key()
    "pk_test_90Yk2QxvQRPpw2T5qEQtyvoP"
  end

  def stripe_secret_key()
    "sk_test_gaalOSmbAPE4yDeFmawGMW2w"
  end

  def darken_color(hex_color, amount=0.4)
    hex_color = hex_color.gsub('#','')
    rgb = hex_color.scan(/../).map {|color| color.hex}
    rgb[0] = (rgb[0].to_i * amount).round
    rgb[1] = (rgb[1].to_i * amount).round
    rgb[2] = (rgb[2].to_i * amount).round
    "#%02x%02x%02x" % rgb
  end

  # Amount should be a decimal between 0 and 1. Higher means lighter
  def lighten_color(hex_color, amount=0.6)
    hex_color = hex_color.gsub('#','')
    rgb = hex_color.scan(/../).map {|color| color.hex}
    rgb[0] = [(rgb[0].to_i + 255 * amount).round, 255].min
    rgb[1] = [(rgb[1].to_i + 255 * amount).round, 255].min
    rgb[2] = [(rgb[2].to_i + 255 * amount).round, 255].min
    "#%02x%02x%02x" % rgb
  end

  def is_admin()

    return !current_account.nil? && current_account.role == "admin"

  end

  def is_logged_in()
    return !current_account.nil?
  end

  def can_see_learn_content?
    return current_account.role == "admin" || current_account.role == "users"
  end

  def aws_bucket()
    "voltic-test-bucket"
  end

  def aws_url()
    "http://s3-ap-southeast-2.amazonaws.com/#{aws_bucket}/"
  end

  def cloudfront_url()
    "http://d2wkzz9b3028w4.cloudfront.net/"
  end

  def render_js_template(name)
    @template = name
    partial 'ui/js/template', :layout => false
  end

  def list_exists(list)
    return !list.nil? && ( list.length > 0 )
  end

  def iterable_list(list)

    if !list.nil? && ( list.length > 0 )
      return list
    else
      return []
    end

  end

  def fail_with_error(error)
    content_type :json
    return {:errors => [error], :success => false }.to_json
  end

  def upload_public_file(tempfile, filename, content_type)

    bucket_name = 'voltic-test-bucket'

    # Get an instance of the S3 interface.
    s3 = AWS::S3.new

    # Upload a file.
    key = File.basename(filename)
    s3.buckets[aws_bucket].objects[key].write(:file => tempfile, :acl => :public_read, :content_type => content_type, :cache_control => "max-age=43200")
    puts "Uploading file #{filename} to bucket #{bucket_name}."
    puts filename

    return {:filename => filename, :url => cloudfront_url + filename}

  end

end
