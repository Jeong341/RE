#include<iostream>
#include<string>
#include<iomanip>
using namespace std;
class Group
{
protected:

   int length; //ʱ�䳤��
public:

 virtual void play()=0;//�طŽ�Ŀ
};
class BoyGroup:public Group
{
	protected:
	char sort;
	int amount;
	public:
	BoyGroup()
	void play()
	{
		
	}
};
