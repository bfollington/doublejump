class Comment
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :body, :type => String
  field :upvotes, :type => Integer
  field :group, :type => Integer
  field :times_reported, :type => Integer

  validates_presence_of :group, :message => "A comment has to belong to something, supply a group."
  validates_length_of   :body, :minimum => 20, :message => "That comment's pretty short, write some more maybe?"

  belongs_to :account
  has_many :reported_comments
  belongs_to :step
  belongs_to :shared_image

end
