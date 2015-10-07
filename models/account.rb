class Account
  include Mongoid::Document
  attr_accessor :password, :password_confirmation

  # Fields
  field :name,             :type => String
  field :surname,          :type => String
  field :email,            :type => String
  field :username,         :type => String
  field :crypted_password, :type => String
  field :role,             :type => String
  field :avatar,           :type => String

  # Validations
  validates_presence_of     :email, :role, :name, :surname, :username
  validates_presence_of     :password,                   :if => :password_required
  validates_presence_of     :password_confirmation,      :if => :password_required
  validates_length_of       :password, :within => 4..40, :if => :password_required
  validates_confirmation_of :password,                   :if => :password_required
  validates_length_of       :email,    :within => 3..100
  validates_uniqueness_of   :email,    :case_sensitive => false
  validates_format_of       :email,    :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_format_of       :role,     :with => /[A-Za-z]/
  validates_uniqueness_of   :username, :case_sensitive => false
  validates_length_of       :username, :within => 1..40

  has_many :comments

  has_many :projects, inverse_of: "account"
  belongs_to :current_project, class_name: "Project", inverse_of: nil

  # Callbacks
  before_save :encrypt_password, :if => :password_required

  def to_hash
    {
      id: _id.to_s,
      current_project: if current_project.nil? then nil else current_project.to_hash end,
      avatar: avatar,
      email: email,
      name: name,
      surname: surname,
      username: username,
      role: role
    }
  end

  ##
  # This method is for authentication purpose.
  #
  def self.authenticate(email, password)
    account = where(:email => /#{Regexp.escape(email)}/i).first if email.present?
    account && account.has_password?(password) ? account : nil
  end


  ##
  # This method is used by AuthenticationHelper.
  #
  def self.find_by_id(id)
    find(id) rescue nil
  end

  def has_password?(password)
    ::BCrypt::Password.new(crypted_password) == password
  end

  private

  def encrypt_password
    self.crypted_password = ::BCrypt::Password.create(self.password)
  end

  def password_required
    crypted_password.blank? || self.password.present?
  end
end
