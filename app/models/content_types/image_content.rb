class ImageContent < Content

  field :src, :type => String, :overwrite => true

  validates_presence_of :src, :message => "Image source is required"

  def to_hash
    {
      id: _id.to_s,
      src: src,
      type: _type
    }
  end

  def from_hash(data)
    update_attributes!({
      src: data["src"]
    })
  end

end

