class Comment
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :text, :type => String

  validates_length_of   :text, :minimum => 1, :message => "That comment's pretty short, write some more maybe?"

  belongs_to :account
  embedded_in :content

  def to_hash
    {
        text: text,
        account: account
    }
  end

end
