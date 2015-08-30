class MathContent < Content

  field :before, :type => String, :overwrite => true
  field :body, :type => String, :overwrite => true
  field :after, :type => String, :overwrite => true

  validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

  def to_hash
    {
      id: _id.to_s,
      body: body,
      type: _type
    }
  end

  def from_hash(data)
    update_attributes!({
      body: data["body"]
    })
  end

end

