require 'spec_helper'

describe 'Account' do
  it "constructs a new instance" do
    @account = Account.new
    expect(@account).to be_an_instance_of(Account)
  end
end
